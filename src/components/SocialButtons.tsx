import { Button, ButtonProps } from '@mantine/core';
import { IconBrandGoogle, IconBrandGithub } from "@tabler/icons"

export function GoogleButton(props: ButtonProps) {
  return <Button
    leftIcon={<IconBrandGoogle />}
    variant="outline"
    color="red"
    {...props}
  />;
}

export function GithubButton(props: ButtonProps) {
  return (
    <Button
      variant="outline"
      leftIcon={<IconBrandGithub />}
      color="teal"
      {...props}
    />
  );
}