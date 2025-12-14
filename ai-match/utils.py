import json
import re

def extract_json(raw):
    # Tìm đoạn JSON bằng regex (không quan tâm trước/sau)
    pattern = r"\{(?:[^{}]|(?:\{[^{}]*\}))*\}"
    matches = re.findall(pattern, raw, flags=re.DOTALL)

    if not matches:
        return None

    for txt in matches:
        try:
            return json.loads(txt)
        except json.JSONDecodeError:
            continue

    return None
