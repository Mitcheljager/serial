source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.0.0"

gem "active_model_serializers"
gem "active_storage_validations"
gem "rails", "~> 6.1.3", ">= 6.1.3.1"
gem "sqlite3", "~> 1.4"
gem "puma", "~> 5.0"
gem "sass-rails", ">= 6"
gem "webpacker", "~> 5.0"
gem "turbolinks", "~> 5"
gem "jbuilder", "~> 2.7"
gem "bcrypt", require: "bcrypt"
gem "webpacker-svelte", "~> 1.0.0"
gem "bootsnap", ">= 1.4.4", require: false
gem "lockbox"
gem "blind_index"
gem "mini_magick", ">= 4.9.5"
gem "image_processing", "~> 1.2"
gem "aws-sdk-s3", require: false

group :development, :test do
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem "web-console", ">= 4.1.0"
  gem "rack-mini-profiler", "~> 2.0"

  if Gem.win_platform?
    gem "win32-security"
  end
end

group :test do
  gem "capybara", ">= 3.26"
  gem "selenium-webdriver"
  gem "webdrivers"
end

gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
