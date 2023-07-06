const test = async () => {
  const response = await window.test.ping()
  console.log(response)
}

test()