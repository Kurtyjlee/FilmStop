// User model
package entities

type User struct {
	Id        uint   `json:"id"`
	FirstName string `json:"first_name" gorm:"type:VARCHAR(30)"`
	LastName  string `json:"last_name" gorm:"type:VARCHAR(30)"`
	Email     string `json:"email" gorm:"unique"`
	Password  []byte `json:"-"`
}
