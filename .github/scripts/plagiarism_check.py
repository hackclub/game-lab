import sys
import subprocess
import os

def run_compare50(single_file, directory, output_dir):
    try:
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        command = ["compare50", single_file, directory, "--output", output_dir]

        subprocess.run(command, check=True)

        print(f"Compare50 results are saved in {output_dir}")

    except subprocess.CalledProcessError as e:
        print("Error in running Compare50:", e)
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    if len(sys.argv) != 4:
        print("Usage: python plagiarism_check.py <single_file> <directory> <output_dir>")
        sys.exit(1)

    single_file = sys.argv[1]
    directory = sys.argv[2]
    output_dir = sys.argv[3]

    if not os.path.exists(single_file):
        print(f"File not found: {single_file}")
        sys.exit(1)

    if not os.path.isdir(directory):
        print(f"Directory not found: {directory}")
        sys.exit(1)

    run_compare50(single_file, directory, output_dir)

if __name__ == "__main__":
    main()