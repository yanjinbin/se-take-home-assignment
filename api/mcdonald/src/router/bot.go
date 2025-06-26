package router

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"mcdonald/src/model"
)

// AddBot creates and registers a new bot
// @Summary Add a new bot
// @Description Adds a bot with a specified name and handling time
// @Tags Bots
// @Accept json
// @Produce json
// @Param request body model.UpdateBotRequest true "Bot creation payload"
// @Success 200 {object} model.Response "Bot added successfully"
// @Failure 400 {object} model.Response "Invalid request body"
// @Failure 500 {object} model.Response "Failed to add bot"
// @Router /bots [post]
func AddBot(c *gin.Context) {
	var req model.UpdateBotRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, model.Response{
			Code:    1000,
			Message: "invalid request body",
		})

		return
	}
	duration := time.Duration(req.HandleTime) * time.Second
	if err := svc.AddBot(c.Request.Context(), duration, req.Name); err != nil {
		c.JSON(http.StatusInternalServerError, model.Response{
			Code:    1000,
			Message: "add bot failed",
		})
	}
	c.JSON(http.StatusOK, model.Response{
		Code:    0,
		Message: "success",
	})
}

// DeleteBot removes a bot by its ID
// @Summary Delete a bot
// @Description Deletes a bot given its ID
// @Tags Bots
// @Produce json
// @Param id path int true "Bot ID"
// @Success 200 {object} model.Response "Bot deleted successfully"
// @Failure 400 {object} model.Response "Invalid bot ID"
// @Failure 500 {object} model.Response "Failed to delete bot"
// @Router /bots/{id} [delete]
func DeleteBot(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, model.Response{
			Code:    1000,
			Message: "invalid bot id",
		})

		return
	}
	err = svc.DeleteBotByID(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.Response{
			Code:    1000,
			Message: "failed to delete bot",
		})

		return
	}
	c.JSON(http.StatusOK, model.Response{
		Code:    0,
		Message: "bot deleted successfully",
	})
}

// BotList returns the list of all bots
// @Summary Get bot list
// @Description Retrieves a list of all registered bots
// @Tags Bots
// @Produce json
// @Success 200 {object} model.Response{data=[]model.Bot} "Bot list retrieved successfully"
// @Failure 500 {object} model.Response "Internal server error"
// @Router /bots [get]
func BotList(c *gin.Context) {
	list, err := svc.BotsList(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.Response{
			Code:    1000,
			Message: "bot list service error",
		})
	}
	if list == nil || len(list) == 0 {
		c.JSON(http.StatusOK, model.Response{
			Code:    0,
			Message: "no bots found",
			Data:    []model.Bot{},
		})

		return
	}

	c.JSON(http.StatusOK, model.Response{
		Code:    0,
		Message: "get data success",
		Data:    list,
	})
}
