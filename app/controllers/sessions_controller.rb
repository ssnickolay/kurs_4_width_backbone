class SessionsController < ApplicationController

  def new
    @title = "Sign in"
  end

  def create
	user = User.authenticate(params[:session][:email],
	                         params[:session][:email])
	if user.nil?
		flash.now[:error] = "Неверная комбинация"
		@title = "Sign in"
		render "new"
	else
		sign_in user
		redirect_back_or user
	end
  end

  def destroy
	sign_out
	flash[:notice] = "Вы вышли из профиля"
	redirect_to root_path
  end
end