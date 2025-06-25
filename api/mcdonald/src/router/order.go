package router

import (
	"mcdonald/src/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

// OrderList returns the list of all orders
// @Summary Get order list
// @Description Retrieves the list of all current orders
// @Tags Orders
// @Produce json
// @Success 200 {object} model.Response{data=[]model.Order} "Order list retrieved successfully"
// @Failure 500 {object} model.Response "Internal server error"
// @Router /orders [get]
func OrderList(c *gin.Context) {
	list := svc.OrdersList(c.Request.Context())
	c.JSON(http.StatusOK, model.Response{
		Code:    0,
		Message: "Order list retrieved successfully",
		Data:    list,
	})
}

// CreateOrder handles the creation of a new order
// @Summary Create a new order
// @Description Creates a new order with the given payload
// @Tags Orders
// @Accept json
// @Produce json
// @Param request body model.CreateOrderRequest true "Order creation request"
// @Success 200 {object} model.Response "Order created successfully"
// @Failure 400 {object} model.Response "Invalid request body"
// @Router /orders [post]
func CreateOrder(c *gin.Context) {
	var req model.CreateOrderRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, model.Response{
			Code:    1000,
			Message: err.Error(),
		})

		return
	}
	svc.AddOrder(req)

	c.JSON(http.StatusOK, model.Response{
		Code:    0,
		Message: "Order created successfully",
	})
}
