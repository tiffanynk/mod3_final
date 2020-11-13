<h1>Mod3 Project | Flatiron School</h1>

<img src="https://i.ibb.co/dGcRjP3/monster-match.png" alt="monster-match" border="0">
<p>
Monster Match is a webapp that utilizies JavaScript, Ruby on Rails, HTML, and CSS.<br>
Monster Match was a challenge I gave myself that incorporated two of the major topics we covered in Mod3: working with event listeners, authentication, authorization, and challenged my understanding of CSS Flexbox.
</p>

<h2>Technologies</h2>

<ul>
 <li>JavaScript</li>
 <li>Ruby on Rails</li>
 <li>HTML5</li>
 <li>CSS</li>
</ul>

<h2>Setup</h2>
To run this project, install it locally by cloning this GitHub repository and opening it in your code editor.<br><br>
From there, open two terminal windows. In the first, navigate into the folder titled <b>full-snack-backend</b> and run <code>rails s</code> in your terminal.<br>
In the second terminal window, navigate into the folder titled <b>full-snack-backend</b> and run <code>lite-server</code><br><br>
This should prompt your browser to open a page at: <code>localhost:3001</code><br><br>
You are now ready to start playing Monster Match! :ghost:<br><br>

<h2>Instructions</h2>
Once you have opened the project through lite-server, you have the option to <b>Sign up</b>,<b>Login</b>, or play as a guest!<br><br>
Move your first Monster to begin the game! Keep track of your high score by creating an account or signing in!<br><br>

<h2>Code Examples</h2>
Authenticating Users:


```ruby
class AuthenticationController < ApplicationController
    skip_before_action :verify_auth, only: [:login]

    def login
        @user = User.find_by(username: params[:username])

        if (@user&.authenticate(params[:password]))
            @token = JWT.encode({
                user_id: @user.id,
                exp: 24.hours.from_now.to_i
            }, Rails.application.secrets.secret_key_base)

            render json: {token: @token}, status: :ok
        else
            render json: {message: 'Login credentials not found'}, status: :unauthorized
        end
    end
end
```
Game Over and Posting Personal High Score:
``` javascript 
function gameOver(turnCount) {
    if (turnCount === 0) {
        board.innerHTML = `
        <div class="game-over-container">
            <img id="game-over-image" src="images/game-over.png" alt="Game Over">
        </div>
        `
        if (score > highScore) {
            highScoreboard.innerHTML = `${score}`
            localStorage.setItem('highScore', score)
        }
    }
}
```


<h2>App Preview</h2>
<b>Game Play:</b>
<img src="https://media.giphy.com/media/hnZuqsSTUvqwxkpE8B/giphy.gif" alt="game-play-animation" border="0"><br><br>
<b>Free Matches + Points Message:</b>
<img src="https://media.giphy.com/media/KHFQvtyNXJt2QpHDc5/giphy.gif" alt="points-message"><br><br>
<b>New Game:</b><br>
<img src="https://media.giphy.com/media/PzMbpKoWNFI977BRGf/giphy.gif" alt="new-game-animation"><br><br>
<b>Sign up and Login Previews Coming Soon!</b>
<h2>User Stories</h2>

<h3>As a user, you will be able to:</h3>

<ol>
 <li>Create an account.</li>
 <li>Play a game</li>
 <li>See remaining moves</li>
 <li>See total points</li>
 <li>See personal high score</li>
</ol>

<h2>Status</h2>

With time, we would like to refactor my code utilizing more iterables, update login and sign up pages, and add features such as:
<li>Adding User Profile</li>
<li>Creating User High Score Leaderboard</li>
<li>Add a button to navigate back to the top of the page.</li>

<h2>Challenges</h2>
<li>Working with a game matrix and understanding the calculations</li>
<li>Initially, my biggest bug was empty Monster image drops on some matches. The issue was my function to populate was within a conditional.</li>
<li>Flexbox was an incredible challenge that took me several days to understand how divs interact with each other.</li>
<li>Developing a High Score table populated with a user's highest score</li>

<h2>Contact</h2>
<a href="https://www.linkedin.com/in/tiffany-kanjanabout/"><img src="https://user-images.githubusercontent.com/68958970/94946276-dc7b8a00-04a9-11eb-9431-366689b9fa06.png" alt="Tiffany Kanjanabout" style="width:10px;height:10px;"></a>Tiffany Kanjanabout :octocat:<br>

<h2>Resources</h2>
Coming Soon!
