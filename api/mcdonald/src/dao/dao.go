package dao

import (
	"mcdonald/src/conf"
)

type Dao struct {
	c *conf.Config
}

func New(cfg *conf.Config) *Dao {
	d := &Dao{
		c: cfg,
	}

	return d
}
