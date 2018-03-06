def ceaser(message):
    ciphered = ""
    for c in message:
        if c.isalpha():
            if c.isupper():
                upper = True
            else:
                upper = False

            c = c.upper()

            place = ord(c)

            if place+13 > 90:
                place = (place+13 - 90) + 64
            else:
                place = place + 13

            if upper:
                ciphered += chr(place)
            else:
                ciphered += chr(place).lower()
        else:
            ciphered += c

    return ciphered