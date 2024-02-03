# IBC part of the exam

## Process

1. We collect the students' unique ids in an array of strings. See an example [here](./samples/student-ids.json). It may be worth to save it in this repo.

2. To create these ids from a CSV, see an example [here](./samples/student-ids.csv), run something like:

    ```sh
    ./script/importStudentIds.ts < ./samples/student-ids.csv > ./samples/student-ids.json
    ```

    See an example of the result [here](./samples/student-ids.json).

3. We generate the token denoms and target addresses with something like:

    ```sh
    ./script/generateStudents.ts < ./samples/student-ids.json > ./samples/student-infos.json
    ```

4. This creates a JSON file of the type, from an example [here](./samples/student-infos.json):

    ```json
    [
        {
            "studentId": "60e4f471-7a5a-4d8e-a320-f6c7533ff54b",
            "mnemonic": "lobster shock script absurd assume near charge law unfair lift just also drill damp music accuse salad rather include relief drive special child coin",
            "addressRecipient": "cosmos19vc35uv05mddlhqlkn8xpg54vsm04rkaka6hhk",
            "homeDenom": "stake19vc35uv05mddlhqlkn8xpg54vsm04rkaka6hhk",
            "result": { "found": false, "channelId": undefined }
        },
        ...
    ]
    ```

5. To send an email to each student, and need the info in a CSV format, you can run something like:

    ```sh
    ./script/reportStudents.ts < ./samples/student-infos.json > ./samples/student-infos.csv
    ```

    See a sample [here](./samples/student-infos.csv).

6. Then at any time that you want to check the status, you can update your info with:

    ```sh
    jq "." <<< cat <<< $(./script/checkStudents.ts < ./samples/student-infos.json) > ./samples/student-infos.json
    ```

    The `cat <<< $(...)` is a small trick to avoid concurrency issuers when reading from the file before writing to it again. The `jq "." <<<` is another trick to still have the readbale formatting for the samples.

    If you want to see a file that gives positive results, do `< ./samples/student-infos-positive.json`.

7. After that, the information has updated `result` statuses.

8. When you want to collect the statuses, to inform the students about the outcome, you can run the same report command, and obtain a report like the example [here](./samples/student-infos.csv):

    ```sh
    ./script/reportStudents.ts < ./samples/student-infos.json > ./samples/student-infos.csv
    ```

## As a student

If you are a student, have your parameters and want to check for your own case only, just run something like:

```sh
$ npx ts-node ./script/checkMe.ts token cosmos1m5gjpnm6fjljvxfktjkvjumk79xdrckmrckypk
```

In the case above, this returns:

```txt
Found it at channel 655!
```

In failing cases, it returns:

```txt
Not found
```

## Maintenance

Before releasing the exercise, it is important to make sure that the latest opened channel id is smaller than `.env`'s `CHANNEL_ID_MAX`. To collect the latest channel id:

1. Prepare the Docker image for Hermes:

    ```sh
    docker build . -f hermes.dockerfile -t hermes:1.7.3
    ```

2. Collect the latest channel id:

    ```sh
    docker run --rm -it hermes:1.7.3 query channels --chain theta-testnet-001 | grep "ChannelId(" -A 1 | grep '"' | sort --version-sort | tail -n 1
    ```

You should get something like:

```txt
channel-3373
```
