// User model
package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	Id uint `json:"id"`
	// Replace with username
	UserName string    `json:"user_name" gorm:"unique"`
	Email    string    `json:"email" gorm:"unique"`
	Password []byte    `json:"-"`
	RoleId   uint      `json:"role_id"`
	Role     Role      `json:"role" gorm:"foreignKey:RoleId"`
	Posts    []Post    `json:"posts" gorm:"foreignKey:UserId"`
	Comments []Comment `json:"comments" gorm:"foreignKey:UserId"`
}

// Method for User
func (user *User) SetPassword(password string) {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 14)
	user.Password = hashedPassword
}

func (user *User) ComparePassword(password string) error {
	return bcrypt.CompareHashAndPassword(user.Password, []byte(password))
}

// Required functions
func (user *User) Count(db *gorm.DB) int64 {
	var total int64
	db.Model(&User{}).Count(&total)
	return total
}

func (user *User) Take(db *gorm.DB, limit int, offset int) interface{} {
	var users []User

	db.Preload("Role").Offset(offset).Limit(limit).Find(&users)

	return users
}
