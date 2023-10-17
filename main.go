package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Serve HTML template with the grid data
	r.LoadHTMLFiles("templates/index.html")
	r.GET("/", func(c *gin.Context) {
		// Generate the grid data (e.g., 1000 cells)
		var gridData []struct{}
		for i := 0; i < 1000; i++ {
			gridData = append(gridData, struct{}{})
		}

		c.HTML(http.StatusOK, "index.html", gin.H{
			"GridData": gridData,
		})
	})

	// Run the server on port 8080
	r.Run(":8080")
}
