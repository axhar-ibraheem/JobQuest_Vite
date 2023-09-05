const extractFullName = (fullName) => {
    const nameParts = fullName.split(" ")
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(" ")
    return {
        firstName : firstName,
        lastName : lastName,
    }
}

export default extractFullName;