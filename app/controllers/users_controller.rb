class UsersController < ApplicationController
  before_action except: [:new, :create] do
    redirect_to login_path unless current_user
  end

  before_action only: [:new] do
    redirect_to root_path if current_user
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      generate_remember_token if params[:remember_me].present? && params[:remember_me] != "0"

      redirect_to root_path
    else
      render :new
    end
  end

  def destroy
    current_user.destroy

    session[:user_id] = nil
    redirect_to login_path
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation, :email)
  end

  def generate_remember_token
    token = SecureRandom.base64
    RememberToken.create(user_id: @user.id, token: token)

    cookies.encrypted[:remember_token] = { value: token, expires: 30.days }
  end
end
