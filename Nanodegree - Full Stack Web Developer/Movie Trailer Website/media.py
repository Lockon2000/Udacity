import webbrowser


class Movie():
    """Objects of type Movie represent Movies and have several attributes
    which supply information about these movis."""

    def __init__(self, title, release_date, budget, author, duration,
                 trailer, poster):
        self.title = title
        self.release_date = release_date
        self.budget = budget
        self.author = author
        self.duration = duration
        self.trailer_youtube_url = trailer
        self.poster_image_url = poster
