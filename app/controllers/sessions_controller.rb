class SessionsController < ApplicationController
  before_action only: [:new, :create] do
    redirect_to root_path if current_user
  end

  def new
  end

  def create
    @user = User.find_by_username(params[:username])

    if @user && @user.authenticate(params[:password])
      generate_remember_token if params[:remember_me].present? && params[:remember_me] != "0"
      session[:user_id] = @user.id

      redirect_to(session[:return_to] || root_path, fallback_location: root_path)
    else
      flash[:alert] = "Username or password is invalid"

      redirect_to login_path
    end
  end

  def destroy
    current_user.remember_tokens.destroy_all if current_user && current_user.remember_tokens.any?
    cookies.delete :remember_token

    reset_session
    redirect_to login_path
  end

  private

  def generate_remember_token
    token = SecureRandom.base64
    RememberToken.create(user_id: @user.id, token: token)

    cookies.encrypted[:remember_token] = { value: token, expires: 30.days }
  end
end
