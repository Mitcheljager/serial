module Current
  thread_mattr_accessor :user
end

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :login_from_cookie
  around_action :set_current_user

  def index; end

  def login_from_cookie
    return unless cookies[:remember_token] && !current_user
    token = RememberToken.find_by_token(cookies.encrypted[:remember_token])

    if token && token.user
      session[:user_id] = token.user.id
    end
  end

  helper_method :current_user

  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    else
      @current_user = nil
    end
  end

  def set_current_user
    Current.user = current_user
    yield
  ensure
    Current.user = nil
  end
end
