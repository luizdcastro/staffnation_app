import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
	Avatar,
	Title,
	Caption,
	Paragraph,
	Drawer,
	Text,
	TouchableRipple,
	Switch,
} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { logoutUser } from "../../redux/actions/authActions";

const DrawerContent = ({ navigation, props, user, dispatchLogoutAction }) => {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	return (
		<View style={styles.screen}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						<View style={{ flexDirection: "row", marginTop: 15 }}>
							<Avatar.Image
								source={{
									uri:
										"https://media-exp1.licdn.com/dms/image/C5603AQH-IzXtXYiPEg/profile-displayphoto-shrink_200_200/0?e=1609977600&v=beta&t=8nmU8WufBQCdDj-wKKcm7NQLI2ml4CNo9JJ1Gc6ZzEs",
								}}
								size={50}
							/>
							<View style={{ marginLeft: 15, flexDirection: "column" }}>
								<Title style={styles.title}>Luiz Castro</Title>
								<Caption style={styles.caption}>@bronze</Caption>
							</View>
						</View>
						<View style={styles.row}>
							<View style={styles.section}>
								<Caption style={styles.caption}>Avaliação: </Caption>
								<Paragraph style={[styles.paragraph, styles.caption]}>5.00</Paragraph>
							</View>

							<View style={styles.section}>
								<Caption style={styles.caption}>Jobs: </Caption>
								<Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
							</View>
						</View>
					</View>
					<Drawer.Section style={styles.drawerSection}>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon name="md-home" color={color} size={size} />
							)}
							label="Home"
							onPress={() => {
								navigation.navigate("HomeDrawer");
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon name="md-calendar" color={color} size={size} />
							)}
							label="Jobs"
							onPress={() => {
								navigation.navigate("JobsPage");
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon name="md-person" color={color} size={size} />
							)}
							label="Perfil"
							onPress={() => {
								navigation.navigate("ProfilePage");
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon name="md-help-circle" color={color} size={size} />
							)}
							label="Suporte"
							onPress={() => {
								navigation.navigate("SupportPage");
							}}
						/>
					</Drawer.Section>
					<Drawer.Section title="Preferências">
						<TouchableRipple onPress={() => toggleTheme()}>
							<View style={styles.preference}>
								<Text>Porra do dark theme aqui</Text>
								<View pointerEvents="none">
									<Switch value={isDarkTheme} />
								</View>
							</View>
						</TouchableRipple>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomDraweSection}>
				<DrawerItem
					icon={({ color, size }) => (
						<Icon name="md-exit" color={color} size={size} />
					)}
					label="Sair"
					onPress={dispatchLogoutAction}
				/>
			</Drawer.Section>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	drawerContent: {
		flex: 1,
	},
	userInfoSection: {
		paddingLeft: 20,
	},
	title: {
		fontSize: 16,
		marginTop: 3,
		fontWeight: "bold",
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
	},
	row: {
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	section: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 15,
	},
	paragraph: {
		fontWeight: "bold",
		marginRight: 3,
	},
	drawerSection: {
		marginTop: 15,
	},
	bottomDraweSection: {
		marginBottom: 15,
		borderTopColor: "#f4f4f4",
		borderTopWidth: 1,
	},
	preference: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => ({
	dispatchLogoutAction: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
