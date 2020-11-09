class AuthenticationController < ApplicationController
    def login
        @user = User.find_by(username: params[:username])

        if (@user&.authenticate(params[:password]))
            @token = JWT.encode({
                user_id: @user.id,
                exp: 24.hours.from_now.to_i
            }, Rails.application.secrets.secret_key_base)

            render json: {token: @token}, status: :ok
        else
            render json: {error: @user.errors.full_messages}, status: :unauthorized
        end
    end
end
