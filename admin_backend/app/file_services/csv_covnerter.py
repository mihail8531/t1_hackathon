from io import BytesIO
from .converter import FileConverter, File
import detect_delimiter
import pandas as pd


class CSVtoXLSXConverter(FileConverter):

    def convert_file(self, input_file: File) -> File:
        if not input_file.name.endswith(".csv"):
            raise ValueError("Input file must be a .csv file")

        first_line = input_file.content.readline().decode()
        input_file.content.seek(0)
        delimiter = detect_delimiter.detect(first_line)
        try:
            df = pd.read_csv(input_file.content, sep=delimiter)
        except Exception as e:
            raise ValueError(f"Error reading CSV content: {e}")

        output_stream = BytesIO()
        with pd.ExcelWriter(output_stream, engine="openpyxl") as writer:
            df.to_excel(writer, index=False, sheet_name="Sheet1")
        output_stream.seek(0)

        output_file = File(
            content=output_stream,
            name=input_file.name.replace(".csv", ".xlsx"),
        )
        return output_file
