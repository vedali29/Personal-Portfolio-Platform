import React from "react";
import "./Login.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    return (
        <>
        <div className="textbox">
            <div className="row">
            <div className="col-md-6">
                <img src="https://www.pinclipart.com/picdir/big/78-784074_tech-time-advanced-technology-technology-icon-clipart.png" alt="reference image"></img>
            </div>
            <div className="col-md-6">
               <div className="abstract">
               <div className="welcome">
                    <h1>Welcome back:)</h1>
                    <p>to keep connected with us please login with your personal information by email address and password.</p>
                </div>
                <div className="textarea">
                    <form>
                        <div className="empass">
                        <div className="email">
                            <input type="text" name="email" placeholder="Enter Email-Address"></input>
                        </div>
                        <div className="password">
                            <input type="password"name="email" placeholder="Enter password"></input>
                        </div>
                        </div>
                        <div className="col-md-8">
                            <input type="radio"></input>
                            <label for="remenber">Remember me</label>
                        </div>
                        <div className="col-md-9">
                        <a href="#">Forget Password</a>
                        </div>
                        <div className="button">
                            <div className="Login">
                            <button className="action" type="submit">Login</button>
                            </div>
                            <div className="create">
                            <button className="action" type="submit">Create Account</button>
                            </div>
                        </div>
                    </form>
                </div><br />
                
                <p>or you can login with</p>
                <div className="icons">
                    <div className="Content">
                    <a href="#"><img src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0" style={{maxHeight:30
                }}></img></a>
                    </div>
                    <div className="Content">
                    <a href="#"><img src="https://marcas-logos.net/wp-content/uploads/2020/03/GITHUB-LOGO-1140x641.png" style={{maxHeight:30
                }}></img></a>
                    </div>
                    <div className="Content">
                    <a href="#"><img src="https://www.pngkey.com/png/full/2-27646_twitter-logo-png-transparent-background-logo-twitter-png.png" style={{maxHeight:30
                }}></img></a>
                    </div>
                </div>  
               </div>
            </div>
            </div>
        </div>
        
        </>
    )
}

export default Login