from flask import Flask, render_template, request, redirect, url_for, session
import os

app = Flask(__name__)

# Secret key for login session
app.secret_key = os.environ.get(
    "SECRET_KEY",
    "birthday-website-secret-key"
)

# Password from Render Environment Variable
BIRTHDAY_PASSWORD = os.environ.get(
    "BIRTHDAY_PASSWORD",
    "1234"
)


@app.route("/", methods=["GET", "POST"])
def login():

    # If already logged in, open birthday website
    if session.get("logged_in"):
        return redirect(url_for("birthday"))

    if request.method == "POST":

        password = request.form.get("password")

        if password == BIRTHDAY_PASSWORD:
            session["logged_in"] = True
            return redirect(url_for("birthday"))

        return render_template(
            "login.html",
            error="Wrong password! Please try again."
        )

    return render_template("login.html")


@app.route("/birthday")
def birthday():

    # Don't allow access without password
    if not session.get("logged_in"):
        return redirect(url_for("login"))

    return render_template("index.html")


@app.route("/logout")
def logout():

    session.clear()
    return redirect(url_for("login"))


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
