package service

import (
	"context"

	"mcdonald/src/model"
)

func (p *OrderPool) Next() *model.Order {
	p.mu.Lock()
	defer p.mu.Unlock()
	if p.vipQueue.Len() > 0 {
		e := p.vipQueue.Front()
		p.vipQueue.Remove(e)

		return e.Value.(*model.Order)
	}
	if p.normalQueue.Len() > 0 {
		e := p.normalQueue.Front()
		p.normalQueue.Remove(e)

		return e.Value.(*model.Order)
	}

	return nil
}

func (p *OrderPool) Add(order *model.Order) {
	p.mu.Lock()
	defer p.mu.Unlock()

	if order.Type == model.VIP {
		p.vipQueue.PushBack(order)
	} else {
		p.normalQueue.PushBack(order)
	}

	// 通知 Bot 有订单来了（非阻塞）
	select {
	case p.orderChan <- struct{}{}:
	default:
	}
}

func (s *Service) AddOrder(req model.CreateOrderRequest) {
	order := &model.Order{
		ID:     s.pool.NextOrderID(),
		Status: model.PENDING,
		Type:   model.NORMAL,
	}
	if req.OrderType == "VIP" {
		order.Type = model.VIP
	}

	s.pool.Add(order)
}

func (s *Service) OrdersList(c context.Context) []*model.Order {
	orders := make([]*model.Order, 0)
	for e := s.pool.vipQueue.Front(); e != nil; e = e.Next() {
		orders = append(orders, e.Value.(*model.Order))
	}
	for e := s.pool.normalQueue.Front(); e != nil; e = e.Next() {
		orders = append(orders, e.Value.(*model.Order))
	}
	for e := s.pool.finishedQueue.Front(); e != nil; e = e.Next() {
		orders = append(orders, e.Value.(*model.Order))
	}

	return orders
}
