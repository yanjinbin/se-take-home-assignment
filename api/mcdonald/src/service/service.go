package service

import (
	"container/list"
	"sync"

	"mcdonald/src/conf"
	"mcdonald/src/dao"
	"mcdonald/src/model"
)

type Service struct {
	cfg  *conf.Config
	dao  *dao.Dao
	bm   *BotManager
	pool *OrderPool
}

func New(c *conf.Config) *Service {
	orderPool := NewOrderPool(100)

	return &Service{
		dao:  dao.New(c),
		cfg:  c,
		pool: orderPool,
		bm:   NewBotManager(orderPool),
	}
}

type OrderPool struct {
	mu          sync.Mutex
	idCounter   int64
	vipQueue    *list.List
	normalQueue *list.List
	orderChan   chan struct{}
}

func (p *OrderPool) NextOrderID() int64 {
	p.mu.Lock()
	defer p.mu.Unlock()

	id := p.idCounter
	p.idCounter++

	return id
}

func NewOrderPool(length int) *OrderPool {
	return &OrderPool{
		vipQueue:    list.New(),
		normalQueue: list.New(),
		orderChan:   make(chan struct{}, length), // 非阻塞唤醒信号
		idCounter:   1,
	}
}

type BotManager struct {
	mu        sync.Mutex
	nextID    int64
	bots      map[int64]*model.Bot
	orderPool *OrderPool
}

func NewBotManager(pool *OrderPool) *BotManager {
	return &BotManager{
		bots:      make(map[int64]*model.Bot),
		orderPool: pool,
		nextID:    1,
	}
}
