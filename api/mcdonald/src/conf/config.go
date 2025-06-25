package conf

type Config struct{}

// LoadConfig is read local config，and remote（future support）.
func LoadConfig(confPath string) (*Config, error) {
	return &Config{}, nil
}
