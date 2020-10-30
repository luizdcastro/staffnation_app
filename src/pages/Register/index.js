import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Platform } from "react-native";

import FormCpf from "../../components/FormCpf";
import FormNamedate from "../../components/FormNameDate";
import FormAdress from "../../components/FormAddress";
import FormEmailPhone from "../../components/FormEmailPhone";
import FormCategories from "../../components/FormCategories";
import FormPassword from "../../components/FormPassword";

const RegisterPage = ({ navigation }) => {
	const [cpfFormFilled, setCpfFormFilled] = useState(false);
	const [nameDateFormFilled, setNameDateFormFilled] = useState(false);
	const [addressFormFilled, setAdressFormFilled] = useState(false);
	const [emailPhoneFormFilled, setEmailPhoneFormFilled] = useState(false);
	const [categoriesFormFilled, setCategoriesFormFilled] = useState(false);
	const [passwordFormFilled, setPasswordFormFilled] = useState(false);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : ""}
			style={styles.container}
		>
			{!cpfFormFilled ? (
				<FormCpf setCpfFormFilled={setCpfFormFilled} navigation={navigation} />
			) : cpfFormFilled & !nameDateFormFilled ? (
				<FormNamedate
					setCpfFormFilled={setCpfFormFilled}
					setNameDateFormFilled={setNameDateFormFilled}
				/>
			) : nameDateFormFilled & !addressFormFilled ? (
				<FormAdress
					setNameDateFormFilled={setNameDateFormFilled}
					setAdressFormFilled={setAdressFormFilled}
				/>
			) : addressFormFilled & !emailPhoneFormFilled ? (
				<FormEmailPhone
					setAdressFormFilled={setAdressFormFilled}
					setEmailPhoneFormFilled={setEmailPhoneFormFilled}
				/>
			) : emailPhoneFormFilled & !categoriesFormFilled ? (
				<FormCategories
					setEmailPhoneFormFilled={setEmailPhoneFormFilled}
					setCategoriesFormFilled={setCategoriesFormFilled}
				/>
			) : categoriesFormFilled & !passwordFormFilled ? (
				<FormPassword
					setCategoriesFormFilled={setCategoriesFormFilled}
					setPasswordFormFilled={setPasswordFormFilled}
				/>
			) : null}
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default RegisterPage;
