import html

from flask import Flask, render_template, url_for

app = Flask(__name__)
app.debug = True


@app.route('/')
def index():
    """Serve the client-side application."""
    return render_template('index.html')


@app.route('/room/')
def roomchooser():
    return render_template('index.html')


@app.route('/room/<string:roomnumber>/', methods=['GET'])
def room(roomnumber):
    return render_template("room.html", roomnum=html.escape(roomnumber))


@app.errorhandler(404)
def not_found_error(error):
    return render_template('error-pages/404.html'), 404
