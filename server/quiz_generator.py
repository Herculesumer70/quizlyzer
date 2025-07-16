# This is python file for locally running valhalla model in server/quiz_generator.py

import sys
from transformers import T5Tokenizer, T5ForConditionalGeneration

#These are the models used to generate queries for any paragraph
tokenizer = T5Tokenizer.from_pretrained("valhalla/t5-base-qg-hl")
model = T5ForConditionalGeneration.from_pretrained("valhalla/t5-base-qg-hl")

paragraph = sys.argv[1]

#In this variable the questions are generated on the server terminal
input_text = "generate questions: " + paragraph
input_ids = tokenizer.encode(input_text, return_tensors="pt")

#The output_ids variable sets the no of question to be generated.
output_ids = model.generate(
    input_ids,
    max_length=256,
    num_return_sequences=4,
    num_beams=5,
    early_stopping=True
)

questions = [tokenizer.decode(ids, skip_special_tokens=True) for ids in output_ids]
for q in questions:
    print(q)
