package service

import (
	"context"
	"errors"
	"fmt"
	"time"

	"mcdonald/src/model"
)

var ErrBotNotFound = errors.New("bot not found")

func (s *Service) AddBot(ctx context.Context, handleTime time.Duration, name string) (err error) {
	_, err = s.registerBot(handleTime, name)
	return
}

func (s *Service) BotsList(ctx context.Context) (list []*model.Bot, err error) {
	s.bm.mu.Lock()
	defer s.bm.mu.Unlock()
	for _, bot := range s.bm.bots {
		list = append(list, bot)
	}

	return list, nil
}

func (s *Service) DeleteBotByID(ctx context.Context, id int64) error {
	s.bm.mu.Lock()
	defer s.bm.mu.Unlock()
	bot, ok := s.bm.bots[id]
	if !ok {
		return ErrBotNotFound
	}

	// 发送停止信号
	close(bot.StopChan)

	// 从 map 移除
	delete(s.bm.bots, id)

	fmt.Printf("Bot #%d delete successfully\n", id)

	return nil
}

func (s *Service) registerBot(handleTime time.Duration, name string) (bot *model.Bot, err error) {
	s.bm.mu.Lock()
	defer s.bm.mu.Unlock()
	bot = &model.Bot{
		ID:              s.bm.nextID,
		Name:            name,
		Status:          model.IDLE,
		OrderHandleTime: handleTime,
		StopChan:        make(chan struct{}),
	}
	s.bm.bots[bot.ID] = bot
	s.bm.nextID++
	s.startBot(bot)
	fmt.Printf("Bot #%d register and start\n", bot.ID)

	return bot, nil
}

func (s *Service) startBot(bot *model.Bot) {
	go func() {
		for {
			if bot.Status == model.BUSY {
				time.Sleep(500 * time.Millisecond)

				continue
			}

			order := s.pool.Next()
			if order == nil {
				select {
				case <-bot.StopChan:
					fmt.Printf("Bot #%d stopped\n", bot.ID)

					return
				case <-s.pool.orderChan:
					continue
				}
			}

			bot.Status = model.BUSY
			bot.CurrentOrder = order
			now := time.Now()
			order.Status = model.PROCESSING
			order.ProcessingSince = &now
			fmt.Printf("Bot #%d handle order #%d curren time:%v\n", bot.ID, order.ID, now)

			done := make(chan struct{})
			go func() {
				select {
				case <-bot.StopChan:
					order.Status = model.PENDING
					bot.Status = model.IDLE
					bot.CurrentOrder = nil
					s.pool.Add(order)
				case <-time.After(bot.OrderHandleTime):
					order.Status = model.COMPLETE
					bot.Status = model.IDLE
					bot.CurrentOrder = nil
					s.pool.finishedQueue.PushBack(order)
				}
				close(done)
			}()

			<-done
		}
	}()
}
