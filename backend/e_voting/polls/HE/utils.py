from lightphe import LightPHE
from lightphe.models.Ciphertext import Ciphertext
import base64

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

cs = LightPHE(algorithm_name ="Paillier")
              #key_file="polls/HE/private_key.txt")
# define plaintext
# m1 = 17
# m2 = 13
# calculate ciphertext
# c1 = cs.encrypt(m1)
# c2 = cs.encrypt(m2)
# c3= c1+c2
# for i in range(10):
#  c3=c3+c1
# print(f"Ciphertext size: {sys.getsizeof(c3.value)}\nDecrypted value: {cs.decrypt(c3)}")
# print(sys.getsizeof(c1.value))

#def encrypt_to_bytes(number:int):
#    cs = LightPHE(algorithm_name="Paillier",
#                  key_file="polls/HE/private_key.txt")
#    c1 = cs.encrypt(number)
#    bytes_representation = base64.b64encode(str(c1.value).encode())
#    print(f"Original Ciphertext:\n {c1.value}")
#    #print(c1.value.bit_length() + 7 // 8)
#    return bytes_representation

#def decrypt_from_bytes(ciphertext_as_bytes):
#    cs = LightPHE(algorithm_name="Paillier",
#                  key_file="polls/HE/private_key.txt")
##    ciphetrext_string=base64.b64decode(ciphertext_as_bytes).decode()
##    ciphertext = int(ciphetrext_string)
#    ciphertextObject = Ciphertext(algorithm_name=cs.algorithm_name, keys=cs.cs.keys, value=ciphertext)
#    print(f"Deserialized ciphertext:\n {ciphertextObject.value}")
#    decrypted_value = cs.decrypt(ciphertextObject)
#    return decrypted_value

#print(decrypt_from_bytes(encrypt_to_bytes(1)))