import smartpy as sp
FA2 = sp.io.import_template("FA2.py")

class NFT(FA2.FA2):
   pass

@sp.add_test(name="tests")
def test():
  admin = sp.address("tz1gYnLf4DL6M4kb4dc5cm778bKFJrMCDoHv")
  scenario = sp.test_scenario()
  scenario.h1("tutorial tests")
  nft = NFT(FA2.FA2_config(non_fungible=True), admin=admin, metadata= sp.big_map({"": sp.utils.bytes_of_string("tezos-storage:content"),"content": sp.utils.bytes_of_string("""{"name": "Tutorial Contract", "description": "NFT contract for the tutorial"}""")}))
  scenario += nft
  nft.mint(token_id=0, address=admin, amount=1, metadata = sp.map({"": sp.utils.bytes_of_string("ipfs://bafkreih36m3d4yfbpyteluvntuph5xybwtgxdvyksbgyg66es44drk4hqy")})).run(sender=admin)
