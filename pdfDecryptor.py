# Lecture Decryptor by DTM

import os, glob, sys, pikepdf
from pathlib import Path


def PDFDecryptor(folder_path):

    folder = Path(folder_path)
    PDFFiles = folder.glob("**/*.pdf")

    for pdf_file in PDFFiles:
        pdf = pikepdf.open(pdf_file,
                           password=sys.argv[1],
                           allow_overwriting_input=True)
        pdf_dec = str(pdf_file).replace('.pdf', '_dec.pdf')
        print("Decrypted ->", pdf_file)
        pdf.save(pdf_dec)

        # Removes the encrypted lecture material
        os.remove(pdf_file)
        os.rename(pdf_dec, pdf_file)


# Activate code in terminal
if __name__ == "__main__":
    PDFDecryptor(".")
