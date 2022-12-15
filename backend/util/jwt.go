// helper functions for jwt
package util

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

const SecretKey = "secret"

// Generate jwt token
func GenerateJwt(issuer string) (string, error) {
	timenow := time.Now().Add(time.Hour * 24)

	// Storing information of the user in jwt format
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    issuer,
		ExpiresAt: timenow.Unix(), // 1 day
	})

	// Generating jwt token
	return claims.SignedString([]byte(SecretKey))
}

// Get the user id of the cookie
func ParseJwt(cookie string) (string, error) {
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil || !token.Valid {
		return "", err
	}

	claims := token.Claims.(*jwt.StandardClaims)

	return claims.Issuer, nil
}
