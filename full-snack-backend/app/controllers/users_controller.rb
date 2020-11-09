class UsersController < ApplicationController
    def index
        @users = User.all 
        render json: @users
    end
    
    def create
        @user = User.new(user_params)

        if @user.save
            render json: @user, status: :created
        else
            render json: {error: 'Bad user'}, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :password)
    end
end