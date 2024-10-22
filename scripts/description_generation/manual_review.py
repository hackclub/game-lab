import json
import webbrowser
import subprocess

def add_to_metadata(filename, description):

    with open("games/" + filename, "r") as f:
        lines = f.readlines()

    added_description = False

    for i in range(len(lines)):
        if "@title" in lines[i]:
            lines.insert(i+1, "@description: " + description + "\n")
            added_description = True
            break

    if not added_description:
        print("The description was not able to be added. Please add this description manually.")
        print("Filename: " + filename)
        print("Description: " + description)
    else:
        # test if this overwrites or appends
        with open("games/" + filename, "w") as f:
            f.writelines(lines)

    if has_code:
        subprocess.run(["code", "games/" + filename])

with open("scripts/description_generation/all_games.json", "r") as f:
    all_games = json.load(f)

has_code = input("Are you using Visual Studio Code and have 'code' installed? (y/n) ").lower() == "y"

index = int(input("What description would you like to start at? "))

while True:

    while all_games[index]["reviewed"] == True:
        index += 1

    filename = all_games[index]["filename"]

    pr_comment = None

    if "pr_comment" in all_games[index]:
        pr_comment = all_games[index]["pr_comment"]

    link = f"https://sprig.hackclub.com/gallery/{filename[:-3]}"

    print(f"""\n\nThis is {filename}, game #{index}\n\nThe link to the game is:\n{link}\n\nThe comment on the pr was:\n{pr_comment}\n\nThe description generated by ChatGPT is:\n{all_games[index]["description"]}\n\n""")

    webbrowser.open(link)

    is_ok = input("Is this description accurate? (y/n) ").lower() == "y"

    if is_ok:
        print("Great, thanks!")
    else:
        all_games[index]["description"] = input("Please write an accurate description: ")

    add_to_metadata(filename, all_games[index]["description"])

    all_games[index]["reviewed"] = True

    with open("scripts/description_generation/all_games.json", "w") as f:
        json.dump(all_games, f, indent=4)
    
    index += 1
    

