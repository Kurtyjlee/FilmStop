package models

type Thread struct {
	Id    uint   `json:"id"`
	Name  string `json:"name"`
	Posts []Post `json:"posts" gorm:"foreignKey:ThreadId"`
}
