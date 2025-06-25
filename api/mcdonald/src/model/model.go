package model

import (
	"time"
)

type OrderType uint

const (
	VIP OrderType = iota + 1
	NORMAL
)

type OrderStatus uint

const (
	PENDING OrderStatus = iota + 1
	PROCESSING
	COMPLETE
)

type BotStatus uint

const (
	IDLE BotStatus = iota + 1
	BUSY
)

// Order 表示一个订单.
type Order struct {
	ID              int64       `json:"id,omitempty"`
	Type            OrderType   `json:"type,omitempty"`
	Status          OrderStatus `json:"status,omitempty"`
	ProcessingSince *time.Time  `json:"processing_since,omitempty"`
}

type Bot struct {
	ID              int64         `json:"id,omitempty"`
	Name            string        `json:"name,omitempty"`
	Status          BotStatus     `json:"status,omitempty"`
	CurrentOrder    *Order        `json:"-"`
	OrderHandleTime time.Duration `json:"-"`
	StopChan        chan struct{} `json:"-"`
}

type Response struct {
	Code    int         `json:"code"              example:"0"`
	Data    interface{} `json:"data,omitempty"`
	Message string      `json:"message,omitempty" example:"success"`
}

type CreateOrderRequest struct {
	OrderType string `json:"order_type,omitempty"`
}

type UpdateBotRequest struct {
	HandleTime int64  `json:"handle_time"`
	Name       string `json:"name"`
}
