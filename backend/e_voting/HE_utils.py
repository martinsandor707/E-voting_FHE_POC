import sys

from lightphe import LightPHE
from lightphe.models.Ciphertext import Ciphertext

algorithms = [
    "RSA",
    "ElGamal",
    "Exponential-ElGamal",
    "Paillier",
    "Damgard-Jurik",
    "Okamoto-Uchiyama",
    "Benaloh",
    "Naccache-Stern",
    "Goldwasser-Micali",
    "EllipticCurve-ElGamal"
]

# cs = LightPHE(algorithm_name ="Paillier",
#              key_file="private_key.txt")
# define plaintext
m1 = 17


# m2 = 13
# calculate ciphertext
# c1 = cs.encrypt(m1)
# c2 = cs.encrypt(m2)
# c3= c1+c2
# for i in range(10):
#  c3=c3+c1
# print(f"Ciphertext size: {sys.getsizeof(c3.value)}\nDecrypted value: {cs.decrypt(c3)}")
# print(sys.getsizeof(c1.value))

def encrypt_number_and_convert_to_bytes(number):
    cs = LightPHE(algorithm_name="Paillier",
                  key_file="private_key.txt")
    c1 = cs.encrypt(number)
    bytes_representation = c1.value.to_bytes((c1.value.bit_length() + 7) // 8, 'big')
    #converted_number = int.from_bytes(bytes_representation, 'big')

    #print("Original number:", c1.value)
    #print("Bytes representation:", bytes_representation)
    #print("Converted number:", converted_number)
    return bytes_representation

def convert_bytes_to_cipher_and_return_number(ciphertext_as_bytes):
    cs = LightPHE(algorithm_name="Paillier",
                  key_file="private_key.txt")
    ciphertext = int.from_bytes(ciphertext_as_bytes, 'big')
    ciphertextObject = Ciphertext(algorithm_name=cs.algorithm_name, keys=cs.cs.keys, value=ciphertext)
    decrypted_value = cs.decrypt(ciphertextObject)
    return decrypted_value

print(f"Original number: {m1}")
c1=encrypt_number_and_convert_to_bytes(m1)
print(f"Ciphertext as bytes: {c1}")
print(f"Decrypted value: {convert_bytes_to_cipher_and_return_number(c1)}")