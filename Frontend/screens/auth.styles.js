import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#fff",
    
    },
    innerContainer:{
    backgroundColor: "#ADD8E6",
    width: SIZES.width*0.9,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    },
    title: {
    fontSize: 24,
    fontFamily: "bold",
    marginBottom: 20,
    },
    input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    },
    button: {
    width: "100%",
    height: 40,
    backgroundColor: COLORS.red,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    },
    buttonText: {
    color: "white",
    fontFamily: "bold",
    },
});
    
    
export default styles;