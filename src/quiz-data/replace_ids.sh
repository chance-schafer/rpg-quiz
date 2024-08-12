#!/bin/bash
input_file="tempfile.ts"
output_file="outputfile.ts"

# Create a temporary file to store replacements
temp_file=$(mktemp)

# Read the input file and assign sequential numbers to each unique ID
awk -F'"id": "' '
/"id":/ {
    match($0, /"id": "([^"]+)"/, arr)
    if (arr[1] != "") {
        if (!(arr[1] in ids)) {
            ids[arr[1]] = ++counter
        }
        sub(/"id": "[^"]+"/, "\"id\": \"" ids[arr[1]] "\"")
    }
}
{print}
' "$input_file" > "$temp_file"

# Move the temporary file to the output file
mv "$temp_file" "$output_file"

echo "ID replacement complete. Check $output_file."
