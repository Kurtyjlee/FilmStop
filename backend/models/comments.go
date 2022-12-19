package models

type Comment struct {
	Id          uint   `json:"id"`
	UpdatedAt   string `json:"updated_at"`
	CreatedAt   string `json:"created_at"`
	Description string `json:"description"`
	Likes       int    `json:"likes"`
}
