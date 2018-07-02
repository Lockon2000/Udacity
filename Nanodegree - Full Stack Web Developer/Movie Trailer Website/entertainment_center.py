import media
import fresh_tomatoes

toy_story = media.Movie("Toy Story", "November 19, 1995", "$30 million",
                        "John Lasseter", "81 minutes",
                        "https://www.youtube.com/watch?v=KYz2wyBy3kc",
                        "https://upload.wikimedia.org/wikipedia/en/1/13/"
                        "Toy_Story.jpg")

avatar = media.Movie("Avatar (2009 film)", "December 18, 2009", "$237 million",
                     "James Cameron", "161 minutes",
                     "https://www.youtube.com/watch?v=8TNlvM4cN6U",
                     "https://upload.wikimedia.org/wikipedia/en/b/b0/"
                     "Avatar-Teaser-Poster.jpg")

harry_potter = media.Movie("Harry Potter and the Prisoner of Azkaban",
                           "23 May 2004", "$130 million",
                           "J. K. Rowling", "142 minutes",
                           "https://www.youtube.com/watch?v=lAxgztbYDbs",
                           "https://i.pinimg.com/originals/ef/67/f1/"
                           "ef67f1db159949ac4f0af5e2f83810bf.jpg")

pitch_black = media.Movie("Pitch Black (film)", "February 18, 2000",
                          "$23 million",
                          "Jim Wheat", "112 minutes",
                          "https://www.youtube.com/watch?v=RQAfHwZqMLw",
                          "https://upload.wikimedia.org/wikipedia/en/2/26"
                          "/Pitch_Black_poster.JPG")

princess_mononoke = media.Movie("Princess Mononoke", "12 July 1997",
                                "$23.5 million", "Hayao Miyazaki",
                                "134 minutes",
                                "https://www.youtube.com/watch?v=pkWWWKKA8jY",
                                "https://upload.wikimedia.org/wikipedia/en/2/"
                                "24/Princess_Mononoke_Japanese_Poster_%28"
                                "Movie%29.jpg")

movies = [toy_story, avatar, harry_potter, pitch_black, princess_mononoke]
fresh_tomatoes.open_movies_page(movies)
