from datetime import datetime, timezone


def get_age(ts):
    seconds = (datetime.now(timezone.utc) - ts).total_seconds()

    if seconds < 60:
        return "{}s".format(int(seconds))
    elif seconds < 60*60:
        return "{}m".format(int(seconds/60))
    elif seconds < 60*60*24:
        return "{}h".format(int(seconds/60/60))

    return "{}d".format(int(seconds/60/60/24))


def safe_to_iso_timestamp(ts):
    try:
        return ts.astimezone().isoformat()
    except AttributeError:
        return None


def safe_to_dict(val):
    try:
        return val.to_dict()
    except AttributeError:
        return None
