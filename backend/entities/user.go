// User model
package entities

type User struct {
	Id        uint
	FirstName string `gorm:"type:VARCHAR(30)"`
	LastName  string `gorm:"type:VARCHAR(30)"`
	Email     string `gorm:"unique"`
	Password  []byte
}
