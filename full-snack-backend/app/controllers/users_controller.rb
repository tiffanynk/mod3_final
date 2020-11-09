class UsersController < ApplicationController
    before_action :verify_auth, only: [:index]
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
            render json: {error: @user.errors.full_messages}, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :password)
    end
end