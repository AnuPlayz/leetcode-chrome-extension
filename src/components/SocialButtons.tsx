import { Button, ButtonProps } from '@mantine/core';
import { } from "@tabler/icons"

export function GoogleButton(props: ButtonProps) {
  return <Button leftIcon={< />} variant="default" color="gray" {...props} />;
}

export function GithubButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      leftIcon={<GithubIcon size={16} />}
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        },
      })}
    />
  );
}