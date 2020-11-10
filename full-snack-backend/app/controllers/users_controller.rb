class UsersController < ApplicationController
    skip_before_action :verify_auth, only: [:create]
    #can put :update and :destroy in limited routes

    def index
        @users = User.all 
        render json: @users
    end

    def create
        @user = User.new(user_params)

        if @user.save
            render json: @user, status: :created
        else
            render json: {
                error: @user.errors.messages.values.join(', ')
                }, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :password)
    end
end