import { upperFirst, useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { GithubButton, GoogleButton } from "./SocialButtons";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
  setDoc
} from "firebase/firestore";
import { useAppDispatch } from "../hooks";
import { setUid } from "../store";
import { showNotification } from "@mantine/notifications";

export function LoginForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (
        val,
      ) => (val.length <= 6
        ? "Password should include at least 6 characters"
        : null),
    },
  });
  const dispatch = useAppDispatch();

  const LoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("openid");
    provider.addScope("https://www.googleapis.com/auth/userinfo.email");
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

    signInWithPopup(getAuth(), provider).then((result) => {
      const user = result.user;

      dispatch(setUid(user.uid));
    }).catch((error) => {
      console.log(error);
      showNotification({
        title: "Error: "+error.code,
        message: error.message,
        color: 'red',
      });
    });
  };

  const LoginWithGithub = () => {
    const provider = new GithubAuthProvider();

    signInWithPopup(getAuth(), provider).then((result) => {
      const user = result.user;

      dispatch(setUid(user.uid));
    }).catch((error) => {
      console.log(error);
      showNotification({
        title: "Error: "+error.code,
        message: error.message,
        color: 'red',
      });
    });
  };

  const LoginWithEmail = () => {
    let { email, password } = form.values;

    signInWithEmailAndPassword(getAuth(), email, password).then((result) => {
      const user = result.user;

      dispatch(setUid(user.uid));
    }).catch((error) => {
      console.log(error);
      showNotification({
        title: "Error: "+error.code,
        message: error.message,
        color: 'red',
      });
    });
  };

  const RegisterWithEmail = () => {
    let { email, password, name } = form.values;

    createUserWithEmailAndPassword(getAuth(), email, password).then(
      async (result) => {
        const user = result.user;
        dispatch(setUid(user.uid));

        //find the user doc and save username to it
        const db = getFirestore();
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());

          const userRef = collection(db, "users");
          const userDoc = doc(userRef, user.uid);
          await updateDoc(userDoc, {
            username: name,
            uid: user.uid,
          });
        } else {
          console.log("No such document!");
          const userRef = collection(db, "users");
          const userDoc = doc(userRef, user.uid);
          
          await setDoc(userDoc, {
            username: name,
            uid: user.uid,
          });
        }
      },
    ).catch((error) => {
      console.log(error);
      showNotification({
        title: "Error: "+error.code,
        message: error.message,
        color: 'red',
      });
    });
  };

  return (
    <Flex w="100%" h="100%" justify={"center"} align={"center"}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to NexusTech, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <div style={{ width: "50px" }} onClick={LoginWithGoogle}>
            <GoogleButton w="100%" radius="xl">Google</GoogleButton>
          </div>
          <div style={{ width: "50px" }} onClick={LoginWithGithub}>
            <GithubButton w="100%" radius="xl">Github</GithubButton>
          </div>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            {type === "register" && (
              <TextInput
                label="Leetcode Username"
                placeholder="Your username"
                value={form.values.name}
                onChange={(event: any) =>
                  form.setFieldValue("name", event.currentTarget.value)}
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@NexusTech.dev"
              value={form.values.email}
              onChange={(event: any) =>
                form.setFieldValue("email", event.currentTarget.value)}
              error={form.errors.email && "Invalid email"}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event: any) =>
                form.setFieldValue("password", event.currentTarget.value)}
              error={form.errors.password &&
                "Password should include at least 6 characters"}
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event: any) =>
                  form.setFieldValue("terms", event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button
              type="submit"
              onClick={type === "register" ? RegisterWithEmail : LoginWithEmail}
            >
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  );
}

export default LoginForm;
