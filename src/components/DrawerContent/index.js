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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { logoutUser } from "../../redux/actions/authActions";

const DrawerContent = ({ props, user, dispatchLogoutAction }) => {
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
										"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
								}}
								size={50}
							/>
							<View style={{ marginLeft: 15, flexDirection: "column" }}>
								<Title style={styles.title}>Luiz Castro</Title>
								<Caption style={styles.caption}>@luizdcastro</Caption>
							</View>
						</View>
						<View style={styles.row}>
							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
								<Caption style={styles.caption}>Following</Caption>
							</View>

							<View style={styles.section}>
								<Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
								<Caption style={styles.caption}>Follower</Caption>
							</View>
						</View>
					</View>
					<Drawer.Section style={styles.drawerSection}>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon name="home-outline" color={color} size={size} />
							)}
							label="Home"
							onPress={() => {
								props.navigation.navigate("Home");
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon name="account-outline" color={color} size={size} />
							)}
							label="Profile"
							onPress={() => {
								props.navigation.navigate("ProfilePage");
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon name="bookmark-outline" color={color} size={size} />
							)}
							label="Bookmarks"
							onPress={() => {
								props.navigation.navigate("FavoritesPage");
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon name="settings-outline" color={color} size={size} />
							)}
							label="Settings"
							onPress={() => {
								props.navigation.navigate("SettingPage");
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon name="account-check-outline" color={color} size={size} />
							)}
							label="Support"
							onPress={() => {
								props.navigation.navigate("SupportPage");
							}}
						/>
					</Drawer.Section>
					<Drawer.Section title="Preferences">
						<TouchableRipple onPress={() => toggleTheme()}>
							<View style={styles.preference}>
								<Text>Dark Theme</Text>
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
						<Icon name="exit-to-app" color={color} size={size} />
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
