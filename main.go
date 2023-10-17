package main

import (
	"log"
	"net/http"
)

func main() {
	// Serve static files from the "static" directory
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	// Serve your HTML templates and handle routes
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/index.html")
	})

	// Start the server on port 8080
	log.Println("Server is running on :8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
