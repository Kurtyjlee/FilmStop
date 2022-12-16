// User model
package models

import "golang.org/x/crypto/bcrypt"

type User struct {
	Id        uint   `json:"id"`
	FirstName string `json:"first_name" gorm:"type:VARCHAR(30)"`
	LastName  string `json:"last_name" gorm:"type:VARCHAR(30)"`
	Email     string `json:"email" gorm:"unique"`
	Password  []byte `json:"-"`
}

// Method for User
func (user *User) SetPassword(password string) {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 14)
	user.Password = hashedPassword
}

func (user *User) ComparePassword(password string) error {
	return bcrypt.CompareHashAndPassword(user.Password, []byte(password))
}
